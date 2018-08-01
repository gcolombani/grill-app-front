const GLOBAL = (
  {
      base_url: 'http://localhost:4000/',
      parseSrc: src => `${GLOBAL.base_url}${src}`,
      pages: {
        list: 0,
        create: 1,
        myList: 2
      }
  }
);

module.exports = GLOBAL;;
