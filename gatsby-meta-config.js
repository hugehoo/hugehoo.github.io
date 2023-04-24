module.exports = {
  title: `Hoo`,
  description: `Dev Hoo`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://www.zoomkoding.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `` // `zoomkoding/zoomkoding-gatsby-blog`,
    }
  },
  ga: "0", // Google Analytics Tracking ID
  author: {
    name: `임성후`,
    bio: {
      role: `개발자`,
      description: ["좋은 코드를 만드는"],
      thumbnail: "sample.png" // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/hugehoo`,
      linkedIn: `https://www.linkedin.com/in/%EC%84%B1%ED%9B%84-%EC%9E%84-7a2238195/`,
      email: `tbnsok40@gmail.com`
    }
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: "",
        activity: "",
        links: {
          github: "",
          post: "",
          googlePlay: "",
          appStore: "",
          demo: ""
        }
      },
      // ========================================================
      // ========================================================
      {
        date: "2022.08 ~ 2023.02",
        activity: "(주) 핏펫 | Backend Developer",
        links: {}
      },
      {
        date: "2020.11 ~ 2022.03",
        activity: "(주) 더존비즈온 개발자",
        links: {}
      },
      {
        date: "2020.06 ~ 2020.09",
        activity: "(주) 멋쟁이사자처럼 직장인 보조강사",
        links: {}
      }
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: "",
        description: "",
        techStack: ["Java", "Spring", "Spring boot", "Javascript", "React", "Python"],
        thumbnailUrl: "",
        links: {
          post: "",
          github: "",
          googlePlay: "",
          appStore: "",
          demo: ""
        }
      },
      // ========================================================
      // ========================================================
      {
        title: "Tidify",
        date: "2023.02 ~ ",
        description:
          "개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.",
        techStack: ["Springboot", "Java", "Mysql", "Jpa"],
        thumbnailUrl: "icon.png",
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          github: "https://github.com/hugehoo/Hospital-Playlist-back",
          demo: "https://friendly-shannon-fbae91.netlify.app/"
        }
      },
      {
        title: "Zep.Sight",
        date: "2022.08",
        description:
          "개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.",
        techStack: ["Springboot", "Java", "Mysql", "Jpa"],
        thumbnailUrl: "blog.png",
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          github: "https://github.com/hugehoo/Hospital-Playlist-back",
          demo: "https://friendly-shannon-fbae91.netlify.app/"
        }
      },
      {
        title: "슬기로운 의사생활 심리테스트",
        date: "2021.08 ~ 2021.10",
        description:
          "개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.",
        techStack: ["Javascript", "Typescript", "React", "NestJs"],
        thumbnailUrl: "blog.png",
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          github: "https://github.com/hugehoo/Hospital-Playlist-back",
          demo: "https://friendly-shannon-fbae91.netlify.app/"
        }
      }
    ]
  }
};
