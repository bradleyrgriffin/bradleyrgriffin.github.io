// src/seo.config.js
const seoProps = {
  title: 'Brad Griffin, Professional',
  description:
    'A professional portfolio showcasing my projects and experience in team leadership and modernization projects in Software Engineering.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bradleyrgriffin.me/',
    site_name: 'Brad Griffin, Professional',
    title: 'Brad Griffin, Professional',
    description:
      'A professional portfolio showcasing my projects and experience in team leadership and modernization projects in Software Engineering.',
    images: [
      {
        url: 'https://bradleyrgriffin.me/profile.jpg',
        width: 800,
        height: 600,
        alt: 'Profile Picture',
      },
    ],
  },
  facebook: {
    appId: 'bradleyrgriffin.me',
  },
};

export default seoProps;
