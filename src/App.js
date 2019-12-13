import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {StateBase} from './state'
import Home from './panels/Home';
import Gift from './panels/Gift';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);
	const [count, setCount] = useState(0);
	const [gift, setGift] = useState(null);


	

	useEffect(() => {
		console.log(StateBase)
		connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": "100" });

		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		connect.sendPromise("VKWebAppStorageGet", {"keys": ["count","date"]}).then(data=> {
			data.keys.forEach(item=>{
				if(item.key==="count"){
					if(!item.value) {
						setCount(3);
					} else {
						setCount(item.value)
					}
				}else if(item.key==="date"){
					const diff = (+ new Date())-Number(item.value)
					   console.log(item.value);
					   console.log(diff);

				}
			});
			
		})
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const countchek =()=> {
		let newcount = count-1
		connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": newcount.toString() });
		connect.sendPromise("VKWebAppStorageSet", {"key": "date", "value": (+ new Date()).toString() });
		setCount(newcount);
		setGift(StateBase[1])
		
		

	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} count={count} countchek={countchek} />
			<Gift id='gift' go={go} gift={gift} />
		</View>
	);
}

export default App;

