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
	const [count, setCount] = useState(null);
	const [gift, setGift] = useState(null);
	const [time, setTime] = useState(null);



	

	useEffect(() => {
		
		
		connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": "2" });
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
			console.log(data);
			
			data.keys.forEach(item=>{
				if(item.key==="count"){
					console.log(item.value);
					console.log(typeof item.value);
				
					if(item.value==="") {
						console.log('====');
						
						setCount(3);
					} else {
						setCount(item.value)
					}
				}else if(item.key==="date"){
					const diff = (+ new Date())-Number(item.value)
					   console.log(item.value);
					   console.log(diff);
					   setTime(Math.ceil(100-(diff/1000/60)));


				}
			});
			
		})
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const countchek =()=> {
		console.log(time);
		let newcount = count-1;
		
		connect.sendPromise("VKWebAppStorageSet", {"key": "date", "value": (+ new Date()).toString() });
		
		if(newcount<=0){
			newcount=-1;
		}

		console.log(newcount);
		
		connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": newcount.toString() });
		setCount(newcount);
		
		setGift(StateBase[1])
		

	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} count={count} countchek={countchek} time={time} />
			<Gift id='gift' go={go} gift={gift} />
		</View>
	);
}

export default App;

