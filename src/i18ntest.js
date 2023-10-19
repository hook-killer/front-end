import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      제목: 'Title',
      작성자: 'Author',
      작성일: 'Date',
      추천: 'Recommend',
      새글: 'New Article',
    },
  },
  ko: {
    translation: {
      제목: '제목',
      작성자: '작성자',
      작성일: '작성일',
      추천: '추천',
      새글: '새글',
    },
  },
  jp: {
    translation: {
      제목: '題目',
      작성자: '作成者',
      작성일: '作成日',
      추천: '推薦.',
      새글: 'サグル',
    },
  },
  cn: {
    translation: {
      제목: '标题',
      작성자: '撰写人',
      작성일: '制定日期',
      추천: '推荐',
      새글: '新文章',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
