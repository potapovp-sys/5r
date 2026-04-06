// ── TRANSLATIONS ──
const LANG = { current: 'ru' };

function setLang(lang) {
  LANG.current = lang;
  document.getElementById('html-root').lang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent === lang.toUpperCase()));

  // Update all data-ru / data-en elements
  document.querySelectorAll('[data-ru]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT') {
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder') || val;
    } else if (val.includes('<')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // Special: search placeholder
  const si = document.getElementById('searchInput');
  if (si) si.placeholder = lang === 'ru' ? 'Поиск по проекту...' : 'Search project...';

  // Re-render grid with translated card names (using data-ru/en on name elements)
  renderGrid(getFiltered());
}

// ── PROJECTS DATA ──
const PROJECTS = [{"name": "Широково", "folder": "108", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352901968_1.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352901977_2.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352901989_4.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902106_5.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902114_6.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902193_7.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902516_8.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902561_11.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902680_12.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352902689_13.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904339_14.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904348_16.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904356_17.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904364_175.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904449_18.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904457_19.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904467_20.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904476_21.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904484_22.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904494_23.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904505_24.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904514_25.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904524_26.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904533_27.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904543_28.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904553_29.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904563_30.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904572_31.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904582_32.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904591_33.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904601_34.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904611_35.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904621_36.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904630_37.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904640_38.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904650_39.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904659_40.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904669_41.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904679_42.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904688_43.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904698_44.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904708_45.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904717_46.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904727_47.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904737_48.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904746_49.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904756_50.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904766_51.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904775_52.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904785_53.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904795_54.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904804_55.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904814_56.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904824_57.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904833_58.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904843_59.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904852_60.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904862_61.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904872_62.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904881_63.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904891_64.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904901_65.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904910_66.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904920_67.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904930_68.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904939_69.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904949_70.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904959_71.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904968_72.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904978_73.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904988_74.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352904997_75.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905007_76.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905016_77.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905026_78.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905036_79.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905045_80.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/108/1352905055_81.jpg"]}, {"name": "Ильинское", "folder": "130", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562774_01.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562790_02.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562804_03.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562817_04.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562831_05.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562843_06.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562855_07.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562869_08.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562882_09.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562895_10.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562909_11.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562923_12.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562937_13.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562951_14.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562966_15.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562980_16.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526562994_17.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563008_18.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563023_19.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563038_20.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563052_21.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563067_22.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563081_23.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563096_24.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563110_25.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563124_26.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563138_27.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563152_28.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563166_29.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563181_30.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563195_31.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563210_32.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563224_33.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563238_34.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563253_35.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563267_36.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563281_37.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563296_38.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563310_39.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563324_40.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563338_41.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563353_42.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563367_43.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563381_44.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563396_45.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563410_46.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563424_47.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563438_48.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563452_49.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563467_50.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563481_51.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/130/1526563495_52.jpg"]}, {"name": "Стрелковый клуб в Барвихе", "folder": "215", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710230_t3n.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710241_c5n.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710252_c6n.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710262_c1n.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710273_c3n.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/215/1596710284_c4n.jpg"]}, {"name": "Селигер", "folder": "119", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414369_01.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414378_02.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414388_03.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414397_04.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414406_05.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414415_06.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414424_07.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414432_08.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414441_09.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414450_10.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414460_11.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414469_12.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414478_13.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/119/1372414487_14.jpg"]}, {"name": "Олимпийские пруды", "folder": "105", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225671_13528951326.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225688_23528951337.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225696_33528951347.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225703_43528951357.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225710_53528951367.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225718_63528951377.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225725_73528951386.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225733_83528951396.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225740_93528951406.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225748_103528951416.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225755_113528951426.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225762_123528951435.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225769_133528951445.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225776_143528951455.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225783_153528951465.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225791_163528951475.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225798_173528951485.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225805_183528951494.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225812_193528951504.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225820_203528951514.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225827_213528951524.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225834_223528951534.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225841_233528951543.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225849_243528951553.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225856_253528951563.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225863_263528951573.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225870_273528951583.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225877_283528951593.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225885_293528951602.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225892_303528951612.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/105/1514225899_313528951622.jpg"]}, {"name": "С Видом на город", "folder": "91", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223818_135281516713.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223839_235281516724.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223851_335281516734.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223862_435281516744.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223873_535281516755.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223885_635281516765.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223896_735281516775.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223908_835281516785.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223919_935281516796.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223931_1035281516806.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223942_1135281516816.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223954_1235281516827.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223965_1335281516837.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223977_1435281516847.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514223988_1535281516857.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224000_1635281516867.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224011_1735281516878.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224023_1835281516888.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224034_1935281516898.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224046_2035281516909.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224057_2135281516919.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224069_2235281516929.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224080_2335281516940.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224092_2435281516950.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/91/1514224103_2535281516960.jpg"]}, {"name": "Sky View", "folder": "97", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224838_13528171521.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224850_23528171532.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224862_33528171542.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224874_43528171553.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224885_53528171563.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224897_63528171573.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224909_73528171584.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224921_83528171594.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224932_93528171604.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224944_103528171614.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224956_113528171625.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224968_123528171635.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224979_133528171645.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514224991_143528171656.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/97/1514225003_153528171666.jpg"]}, {"name": "Фьюжн на Смоленке", "folder": "111", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226638_135291163211.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226657_235291163222.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226669_335291163233.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226681_435291163244.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226693_535291163255.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226705_635291163266.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226717_735291163277.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226729_835291163288.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226741_935291163299.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226753_1035291163310.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226765_1135291163320.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226777_1235291163331.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226789_1335291163342.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226801_1435291163353.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226813_1535291163364.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226825_1635291163375.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226837_1735291163385.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226849_1835291163396.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226861_1935291163407.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/111/1514226873_2035291163418.jpg"]}, {"name": "Майндорф 2", "folder": "210", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/210/1553698161_bc021.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/210/1553698175_bc041.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/210/1553698185_bc051.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/210/1553698196_bc061.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/210/1553698208_bc071.jpg"]}, {"name": "Вилла Майя", "folder": "124", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454772_001.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454780_002.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454789_003.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454797_004.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454806_005.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454814_006.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454823_007.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454831_008.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454840_009.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454848_010.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454856_011.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454865_012.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454873_013.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454882_014.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454890_015.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454899_016.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454907_017.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454916_018.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454924_019.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454933_020.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454941_021.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454950_022.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454958_023.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454967_024.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454975_025.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454984_026.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537454992_027.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455001_028.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455009_029.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455018_030.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455026_031.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455035_032.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455043_033.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455052_034.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455060_035.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455069_036.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455077_037.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455086_038.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455094_039.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455103_040.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455111_041.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455120_042.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/124/1537455128_043.jpg"]}, {"name": "Дом на Новой Риге", "folder": "125", "images": ["https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245050_011.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245060_021.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245070_031.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245080_041.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245090_051.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245100_061.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245110_071.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245120_081.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245130_091.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245140_101.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245150_111.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245161_121.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245171_131.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245181_141.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245191_151.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245201_161.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245211_171.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245221_181.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245231_191.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245241_201.jpg", "https://wsrv.nl/?url=5r.ru/wp-content/portfolio/125/1517245251_211.jpg"]}];


// ── STATE ──
let currentProject = null, currentImgIdx = 0;
let activeFilter = 'all', searchQuery = '';

// ── RENDER GRID ──
function renderGrid(projects) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  if (!projects.length) {
    grid.innerHTML = '<div class="no-results">' + (LANG.current === 'ru' ? 'Проекты не найдены' : 'No projects found') + '</div>';
    return;
  }
  projects.forEach((p, i) => {
    const isLarge = p.images.length >= 40 && i % 5 === 0;
    const card = document.createElement('div');
    card.className = 'project-card' + (isLarge ? ' large' : '');
    card.style.animationDelay = (i * 0.035) + 's';

    // Image with no-referrer to bypass hotlink protection
    const img = document.createElement('img');
    img.className = 'card-img';
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.src = p.images[0];
    img.alt = p.name;
    img.loading = 'lazy';
    img._tries = 0;
    img.onerror = function() {
      img._tries++;
      if (img._tries === 1) {
        // Fallback 1: try images.weserv.nl
        img.src = p.images[0].replace('https://wsrv.nl/?url=', 'https://images.weserv.nl/?url=');
      } else if (img._tries === 2) {
        // Fallback 2: direct URL
        img.src = 'https://' + p.images[0].replace('https://wsrv.nl/?url=', '');
      } else {
        // Final: placeholder with first letter
        this.style.display = 'none';
        let ph = card.querySelector('.card-placeholder');
        if (!ph) { ph = document.createElement('div'); ph.className = 'card-placeholder'; ph.textContent = p.name.charAt(0); card.insertBefore(ph, card.firstChild); }
      }
    };

    const overlay = document.createElement('div'); overlay.className = 'card-overlay';
    const num = document.createElement('div'); num.className = 'card-num'; num.textContent = String(i+1).padStart(2,'0');
    const info = document.createElement('div'); info.className = 'card-info';
    info.innerHTML = `<div class="card-name">${p.name}</div><div class="card-meta"><span class="card-arrow">→</span></div>`;

    card.appendChild(img); card.appendChild(overlay); card.appendChild(num); card.appendChild(info);
    card.addEventListener('click', () => openLightbox(p, 0));
    grid.appendChild(card);
  });
}

// ── FILTER ──
function getFiltered() {
  return PROJECTS.filter(p => {
    const mf = activeFilter === 'all' || (activeFilter === 'large' && p.images.length >= 30) || (activeFilter === 'medium' && p.images.length >= 10 && p.images.length < 30) || (activeFilter === 'small' && p.images.length < 10);
    const ms = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return mf && ms;
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderGrid(getFiltered());
  });
});
document.getElementById('searchInput').addEventListener('input', e => { searchQuery = e.target.value; renderGrid(getFiltered()); });

// ── SECTION NAV ──
function showSection(name) {
  const portfolioEls = ['#sec-portfolio-hero','#sec-portfolio-filters','#sec-portfolio-gallery'];
  portfolioEls.forEach(sel => { const el = document.querySelector(sel); if (el) el.style.display = (name === 'portfolio') ? '' : 'none'; });
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.sec === name));
  if (name !== 'portfolio') { const sec = document.getElementById('sec-' + name); if (sec) { sec.classList.add('active'); window.scrollTo(0,0); } }
  else { window.scrollTo(0,0); }
}

// ── LIGHTBOX ──
function openLightbox(project, imgIdx) {
  currentProject = project; currentImgIdx = imgIdx;
  const lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  setTimeout(() => lb.classList.add('visible'), 10);
  document.body.style.overflow = 'hidden';
  buildThumbs(); updateLightbox();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('visible');
  setTimeout(() => { lb.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}

function updateLightbox() {
  const img = document.getElementById('lbImg');
  const counter = document.getElementById('lbCounter');
  const title = document.getElementById('lbTitle');
  const fill = document.getElementById('lbProgressFill');
  img.classList.add('loading');
  const src = currentProject.images[currentImgIdx];
  const ni = new Image();
  ni.referrerPolicy = 'no-referrer';
  ni.onload = () => { img.src = src; img.classList.remove('loading'); };
  ni._tries = 0;
  ni.onerror = () => {
    ni._tries++;
    if (ni._tries === 1) {
      const fallback = src.replace('https://wsrv.nl/?url=', 'https://images.weserv.nl/?url=');
      const ni2 = new Image();
      ni2.onload = () => { img.src = fallback; img.classList.remove('loading'); };
      ni2.onerror = () => { img.src = 'https://' + src.replace('https://wsrv.nl/?url=', ''); img.classList.remove('loading'); };
      ni2.src = fallback;
    } else {
      img.src = 'https://' + src.replace('https://wsrv.nl/?url=', '');
      img.classList.remove('loading');
    }
  };
  ni.src = src;
  title.textContent = currentProject.name;
  counter.textContent = (currentImgIdx + 1) + ' / ' + currentProject.images.length;
  fill.style.width = ((currentImgIdx + 1) / currentProject.images.length * 100) + '%';
  document.querySelectorAll('.lb-thumb').forEach((t,i) => t.classList.toggle('active', i === currentImgIdx));
  const at = document.querySelector('.lb-thumb.active');
  if (at) at.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
}

function buildThumbs() {
  const c = document.getElementById('lbThumbs');
  c.innerHTML = '';
  currentProject.images.forEach((src, i) => {
    const t = document.createElement('img');
    t.className = 'lb-thumb' + (i === 0 ? ' active' : '');
    t.src = src; t.loading = 'lazy';
    t.setAttribute('referrerpolicy', 'no-referrer');
    t.addEventListener('click', () => { currentImgIdx = i; updateLightbox(); });
    c.appendChild(t);
  });
}

function lbNav(dir) {
  currentImgIdx = (currentImgIdx + dir + currentProject.images.length) % currentProject.images.length;
  updateLightbox();
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (lb.style.display !== 'flex') return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') lbNav(1);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') lbNav(-1);
  if (e.key === 'Escape') closeLightbox();
});
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });

let tX = 0;
document.getElementById('lbImg').addEventListener('touchstart', e => { tX = e.touches[0].clientX; });
document.getElementById('lbImg').addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tX; if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1); });

// ── INIT ──
renderGrid(PROJECTS);
