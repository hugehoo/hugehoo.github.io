---
emoji: 🌿🤙🏻
title: Springboot 원리 알아가기
date: '2023-04-30 00:00:00'
author: Hoo
tags: 블로그 github-pages gatsby
categories: springboot
---

자바의 서블릿 컨테이너(Tomcat)가 실행되고, 스프링 컨테이너도 실행된다.


스프링 프로젝트를 처음 생성했을 때 모습.
main() 메서드 이외엔 크게 볼게 없다, 하지만 정말 그럴까? 보이는게 다가 아니라는게 알기에 @SpringbootApplication 기저에 깔린 여러 동작원리를 살펴보겠습니다.

```java
// 최초의 모습

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HellobootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HellobootApplication.class, args);
	}

}
````

모든 imports 를 삭제하고, 어노테이션과 SpringApplication 도 삭제하여 main 메서드를 실행하면 아무일도 일어나지 않는다.

```java
public class HellobootApplication {
	public static void main(String[] args) {
	}
}
```

톰캣 서블릿 컨테이너와 스프링 컨테이너 모두 실행되지 않은 것을 볼 수 있다.


이제 `직접` 서블릿 컨테이너를 띄우고, 내부에 서블릿을 추가해보자.
여기서 서블릿이란 서블릿 컨테이너에 들어가는 웹 컴포넌트를 의미한다.

우선 빈(empty) 서블릿 컨테이너를 띄워보자.
```java
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServer;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;

public class HellobootApplication {

    public static void main(String[] args) {
        ServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
        WebServer webServer = serverFactory.getWebServer();
        webServer.start();
    }

}
```
WebserFactory 를 상속받는 ServletWebFactory `팩토리` 인터페이스가 등장한다. 내부에는 getWebServer() 추상 메서드가 정의돼 있습니다.
getWebServer() 메서드는 주석에도 나왔듯 설정이 완료된`fully configured` 일시정지`paused` 상태의 WebServer 인스턴스를 생성합니다. 즉 실행되기 전 상태의 WebServer 인스턴스.
![](https://velog.velcdn.com/images/tbnsok40/post/fc470a62-a7e2-4e88-9432-fb8a04290888/image.png)

그렇게 생성된 webServer의 start() 를 호출하면 톰캣 서블릿 컨테이너가 실행됩니다.
![](https://velog.velcdn.com/images/tbnsok40/post/be2da107-afe1-4355-a3c0-8cbfceb326a7/image.png)

서블릿 컨테이너가 생성됐으니, 컨테이너에 들어갈 컴포넌트(서블릿)를 생성해보겠습니다.

```java
public class HellobootApplication {

    public static void main(String[] args) {
        ServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
        WebServer webServer = serverFactory.getWebServer(servletContext -> {
            servletContext.addServlet("hello", new HttpServlet() {
                @Override
                protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                    resp.setStatus(HttpStatus.OK.value());
                    resp.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);
                    resp.getWriter().println("Hello Servlet");
                }
            }).addMapping("/hello");
        });
        webServer.start();
    }

}
```
getWebServer() 의 인자에 람다식을 사용하여 서블릿을 추가합니다.
servletContext.addServlet() 메서드는 첫번째 인자로 `서블릿의 이름을 문자열`로 받고, 두번째 인자로 `서블릿 인스턴스`를 받습니다.

서블릿 인스턴스에 해당하는 HttpServlet() 만 분리한 코드입니다.
Response 는 `Status, Header, Body` 세 부분으로 이루어진 점을 고려해 응답할 정보를 resp 변수에 담는 것을 볼 수 있습니다.
```java
new HttpServlet() {
                @Override
                protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                    resp.setStatus(HttpStatus.OK.value());
                    resp.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);
                    resp.getWriter().println("Hello Servlet");
                }
            }
```

그렇게 서블릿 컨테이너에 추가된 서블릿을 addMapping() 메서드를 사용해 `/hello` URL에 바인딩 합니다.

```java
servletContext.addServlet("hello", new HttpServlet() {...})
.addMapping("/hello");
```
생각해보면 new HttpServlet() 에 해당되는 내용은 우리가 흔히 사용하는 Controller의 역할을 하고 있습니다.

#### 프론트 컨트롤러
- 역할 : 모든 서블릿에 등장하는 공통적인 처리(`인증, 보안, 다국어`)를 가장 앞단의 컨트롤러에서 담당. 즉 모든 웹 요청에 공통적으로 처리 필요한 요청을 처리.
- 프론트 컨트롤러는 받은 모든 요청을 적절히 다른 컨트롤러에 `위임`한다.


### 스프링 컨테이너 사용
- `컨테이너`는 여러 오브젝트를 보관하고 필요할 때 꺼내 사용할 수 있도록 관리한다.
- 스프링 컨테이너의 동작방식
- 크게 2가지 필요
  - POJO : 비즈니스 로직을 담당 (비즈니스 로직과 관련없는 클래스를 상속할 필요 X)
  - Configuration Metadata : 컨테이너 구성 정보
- **정리하면** 스프링 컨테이너는 1) POJO 라는 Business Objects 와 2) Configuration Metadata 를 조합하여 서버 어플리케이션으로 사용할 수 있는 시스템을 만든다.
  ![](https://velog.velcdn.com/images/tbnsok40/post/abe288ab-56f1-4fa7-bc75-82a2604b2af6/image.png)

위 그림의 초록 상자, Full Configured System은 사실 스프링 컨테이너 내부에 위치한다.

<hr>

`ApplicationContext` : 스프링 컨테이너를 대표하는 인터페이스. 개발자가 수동으로 스프링 컨테이너를 띄울 일이 생긴다면 기억해야 할 인터페이스로, ApplicationContext가 곧 Spring Container.

registerBean() 메서드를 사용해 스프링 컨테이너에 등록할 오브젝트를 추가한다.


``` java
public class HellobootApplication {

    public static void main(String[] args) {

		//
        GenericApplicationContext applicationContext = new GenericApplicationContext();
        applicationContext.registerBean(HelloController.class);
        applicationContext.registerBean(SimpleHelloService.class);
        applicationContext.refresh();

        ServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
        WebServer webServer = serverFactory.getWebServer(servletContext -> {...});
        webServer.start();
    }

}
```

아래 코드는 HelloController 클래스를 Bean 오브젝트로 생성을 의미한다.
```java
applicationContext.registerBean(HelloController.class);
// HelloController.class 라는 메타정보를 주입
```
이렇게 스프링 컨테이너에 빈이 등록되면, 서블릿 컨테이너에서 필요한 빈을 꺼내 사용(매핑)한다.
- applicationContext.registerBean() : 스프링의 구성정보를 만들 땐(bean 생성할 땐) 정확히 어떤 클래스를 가지고 만들 것인지 `구체 클래스`를 적어야 한다.
- 어떤 빈을 만들던 순서는 고려하지 않아도 된다. 스프링 컨테이너가 자동으로 순서문제를 해결한다.


### 스프링 컨테이너는 싱글톤 빈을 생성
![](https://velog.velcdn.com/images/tbnsok40/post/24535a45-3a1c-4dee-a03b-327eda562424/image.png)

- 서블릿 컨테이너의 Front Controller(서블릿) 뿐만 아니라 다른 서블릿에서도 스프링 컨테이너의 HelloController(Bean) 오브젝트를 필요로 할 수 있다.
- 이 때 필요할 때마다 새로운 HelloController Bean 을 생성하지 않고, 스프링 컨테이너가 단 한번 생성해둔 HelloController Bean 을 재사용하는 방식으로 동작한다 => `싱글톤`
- 스프링 컨테이너는 특별히 싱글톤 패턴을 구현하지 않지만 싱글톤 기능을 제공하기 때문에 스프링 컨테이너를 `싱글톤 레지스트리`라 부른다.

### 스프링 컨테이너의 역할
- 메타 정보를 주입하면 클래스의 싱글톤 오브젝트를 생성
  - 주입 : 의존대상의 `레퍼런스`를 넘겨준다. 가장 잘 알려진 생성자 주입 방식으로 넘겨줄 수도 있고, 프로퍼티를 정의하여 setter로 레퍼런스를 넘겨줄 수도 있다.
- 생성할 오브젝트가 의존하는 다른 클래스가 있다면, 의존 대상 오브젝트를 주입하는 역할도 담당한다.

아래 코드의 메커니즘을 요약하자면
(1) Spring Container 생성
(2) Spring Container 에 필요한 오브젝트 등록하여 `Bean` 생성
(3) Servlet Container 내부에서는 필요한 Spring Bean 을 꺼내 사용하기 위해 `applicationContext.getBean(HelloController.class);` 호출
(4) 비즈니스 로직은 getBean() 으로 꺼낸 helloController.hello()에 의해 처리되고, 그 결과를 응답 변수에 담아 클라이언트에게 리턴한다. (클라이언트에 리턴하는 로직은 해당 코드에 나타나지 않는다)
```java
public class HellobootApplication {

    public static void main(String[] args) {
        // Spring Container 생성 - (1)
        GenericApplicationContext applicationContext = new GenericApplicationContext();

        // Spring Container 에 Bean 등록(주입) - (2)
        applicationContext.registerBean(HelloController.class);
        applicationContext.registerBean(SimpleHelloService.class);
        applicationContext.refresh();

        ServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
        WebServer webServer = serverFactory.getWebServer(servletContext -> {
            servletContext.addServlet("hello", new HttpServlet() {
                @Override
                protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                    if (req.getRequestURI().equals("/hello") && req.getMethod().equals(HttpMethod.GET.name())) {
                        String name = req.getParameter("name");

                        // Servlet Container 내부 Spring Container 에서 필요한 빈을 꺼내 사용 - (3)
                        HelloController helloController = applicationContext.getBean(HelloController.class);
                        String ret = helloController.hello(name);

                        resp.setContentType(MediaType.TEXT_PLAIN_VALUE);
                        resp.getWriter().println(ret);
                    }
                    else {
                        resp.setStatus(HttpStatus.NOT_FOUND.value());
                    }
                }
            }).addMapping("/*");
        });
        webServer.start();
    }

}
```

### DispatcherServlet 으로 전환
- 매핑/요청 파라미터 `바인딩` 등의 기능이 서블릿 컨테이너 코드 내부에 모두 드러난다 -> 서블릿 등록하는 코드를 모두 없애고 `DispatcherServlet`으로 대체한다.
- 요약 : HttpServlet(Front Controller) -> DispatcherServlet 으로 대체

```java
// 기존
WebServer webServer = serverFactory.getWebServer(servletContext -> {
            servletContext.addServlet("hello", new HttpServlet() {
                @Override
                protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                    // 인증, 보안, 다국어, 공통 기능
                    if (req.getRequestURI().equals("/hello") && req.getMethod().equals(HttpMethod.GET.name())) {
                        String name = req.getParameter("name");

                        HelloController helloController = applicationContext.getBean(HelloController.class);
                        String ret = helloController.hello(name);

                        resp.setContentType(MediaType.TEXT_PLAIN_VALUE);
                        resp.getWriter().println(ret);
                    }
                    else {
                        resp.setStatus(HttpStatus.NOT_FOUND.value());
                    }
                }
            }).addMapping("/*");
        }
);


// 개선
WebServer webServer = serverFactory.getWebServer(servletContext -> {
            servletContext.addServlet("dispatcherServlet",
										new DispatcherServlet(applicationContext))
					.addMapping("/*");
        }
);
```
Servlet Container에 hello 라는 개별 서블릿(HttpServlet)을 등록하는 대신 dispatcherServlet 을 등록하고 동시에 Spring Container 인 applicationContext 를 생성자 주입받는다. 이렇게 하면 스프링 컨테이너에 미리 등록된 Bean을 DispatcherServlet에서 인지할 수 있다.
* DispatcherServlet은 @RestController 가 붙어있으면, 모든 메서드에 @ResponesBody가 붙어있다고 간주한다.

- 아래 코드는 두 부분으로 나뉜다.
- 스프링 컨테이너가 먼저 만들어지고, 서블릿 컨테이너를 생성한다.
``` java
public static void main(String[] args) {

		// Spring Container생성 및 Bean 등록 (1)
        GenericWebApplicationContext applicationContext = new GenericWebApplicationContext();
        applicationContext.registerBean(HelloController.class);
        applicationContext.registerBean(SimpleHelloService.class);
        applicationContext.refresh(); // 스프링 컨테이너 초기화

		// ServletContainer 초기화 (2)
		// DispatcherServlet을 ServletContainer에 등록
        ServletWebServerFactory serverFactory = new TomcatServletWebServerFactory();
        WebServer webServer = serverFactory.getWebServer(servletContext -> {
            servletContext.addServlet("dispatcherServlet",
                            new DispatcherServlet(applicationContext))
                    .addMapping("/*");
        });
        webServer.start();
    }
```


