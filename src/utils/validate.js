/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const valid_map = ['admin',
	 'saxc','saxc1','saxc2','saxc3','saxc4','saxc5','saxc6','saxc7','saxc8','saxc9','saxc10','saxc11','saxc12','saxc13',
	 'hyhy','hyhy1','hyhy2','hyhy3','hyhy4','hyhy5','hyhy6','hyhy7','hyhy8','hyhy9','hyhy10', 
	 'xd','xd1','xd2','xd3','xd4','xd5','xd6','xd7','xd8','xd9','xd10','xd11','xd12','xd13','xd14','xd15','xd16','xd17','xd18','xd19',
	 'sjl','sjl1','sjl2','sjl3','sjl4','sjl5','sjl6','sjl7','sjl8','sjl9','sjl10','sjl11','sjl12','sjl13',
	 'sagj','sagj1','sagj2','sagj3','sagj4','sagj5','sagj6','sagj7','sagj8','sagj9','sagj10','sagj11','sagj12','sagj13','sagj14',
	 'qzl','qzl1','qzl2','qzl3','qzl4','qzl5','qzl6','qzl7','qzl8','qzl9','qzl10','qzl11','qzl12','qzl13','qzl14',
	 'tj','tj1','tj2','tj3','tj4','tj5','tj6','tj7','tj8','tj9','tj10','tj11','tj12','tj13',
	 'wcsc','wcsc1','wcsc2','wcsc3','wcsc4','wcsc5','wcsc6','wcsc7','wcsc8','wcsc9','wcsc10','wcsc11','wcsc12','wcsc13','wcsc14','wcsc15','wcsc16',
	 'csl','csl1','csl2','csl3','csl4','csl5','csl6','csl7','csl8','csl9','csl10','csl11','csl12','csl13',
	 'hd','hd1','hd2','hd3','hd4','hd5','hd6','hd7',
	 'yls','yls1','yls2','yls3','yls4','yls5','yls6','yls7','yls8','yls9','yls10','yls11','yls12','yls13',
	 'yjh','yjh1','yjh2','yjh3','yjh4','yjh5','yjh6','yjh7','yjh8','yjh9','yjh10','yjh11','yjh12',
	 'cl','cl1','cl2','cl3','cl4','cl5','cl6','cl7','cl8','cl9','cl10','cl11','cl12','cl13','cl14','cl15','cl16',
	 'qyl','qyl1','qyl2','qyl3','qyl4','qyl5','qyl6','qyl7','qyl8','qyl9','qyl10','qyl11','qyl12','qyl13','qyl14','qyl15','qyl16','qyl17',
	 'gjc','gjc1','gjc2','gjc3','gjc4','gjc5','gjc6','gjc7','gjc8','gjc9','gjc10','gjc11','gjc12','gjc13','gjc14','gjc15','gjc16','gjc17','gjc18','gjc19','gjc20','gjc21','gjc22','gjc23',
	 'ylw','ylw1','ylw2','ylw3','ylw4','ylw5','ylw6','ylw7','ylw8','ylw9','ylw10','ylw11','ylw12','ylw13',]
  return valid_map.indexOf(str.trim()) >= 0
}

