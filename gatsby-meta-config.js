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
      description: ["P와J 사이의", "Python 과 Jvm을 사랑하는"],
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
        activity: "(주) 더존비즈온 | Software Engineer",
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
          "iOS 공유하기 버튼 (Share extension) 기반, 북마크 아카이빙 서비스의 서버 개발을 전담했습니다. 북마크 공유/구독 기능으로 개발해 타 서비스와 차별점을 갖습니다.",
        techStack: ["Java", "Springboot", "Mysql", "Jpa", "QDSL", "Docker", "Grafana", "OAuth2"],
        thumbnailUrl: "tdf.png",
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          github: "https://github.com/hugehoo/tidify-be",
          appStore: "https://apps.apple.com/kr/app/tidify/id6449292500"
        }
      },
      {
        title: "Zep.Sight",
        date: "2022.08",
        description:
          "[정션 아시아 2022 해커톤] 프로젝트로 메타버스 플랫폼 ZEP 트랙에 참여해 우승했습니다. 메타버스 공간(ZEP) Analytics 시각화 서비스를 개발했습니다.",
        techStack: ["Springboot", "Java", "Mysql", "Jpa"],
        thumbnailUrl: "zepsight.png",
        links: {
          post: 'https://blog.naver.com/tbnsok40/222855572260',
          github: "https://github.com/ZEP-SIGHT/junction-back",
          // demo: "https://friendly-shannon-fbae91.netlify.app/"
        }
      },
      {
        title: "슬기로운 의사생활 심리테스트",
        date: "2021.08 ~ 2021.10",
        description:
          "드라마 '슬기로운 의사생활'을 소재로 개발한 심리테스트입니다. 프로젝트의 처음과 끝을 책임지며 웹 API 설계 및 Frontend/Backend 개발, 배포 했습니다.",
        techStack: ["Javascript", "Typescript", "React", "NestJs"],
        thumbnailUrl: "hospital.png",
        links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          github: "https://github.com/hugehoo/Hospital-Playlist-back",
          demo: "https://friendly-shannon-fbae91.netlify.app/"
        }
      }
    ]
  }
};
