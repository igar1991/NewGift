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
	const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
	const [count, setCount] = useState(null);
	const [gift, setGift] = useState(null);
	const [time, setTime] = useState(null);

	useEffect(() => {
		
		console.log(typeof time);
		
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
			
		}
		connect.sendPromise("VKWebAppStorageGet", {"keys": ["count","date"]}).then(data=> {
			data.keys.forEach(item=>{
				if(item.key==="count"){
					if(item.value==="") {
						setCount(3);
					} else {
						setCount(item.value)
					}
				}else if(item.key==="date"){
					const diff = (+ new Date())-Number(item.value);
					const timeall= Math.ceil((5-diff/1000/60))
					setTime(timeall);
					setPopout(null);
					if(timeall<=0){
						checkTime();
					}
					
					console.log(timeall);
					
				}
			});
		})
		fetchData();
		console.log(time);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const randomInteger=(min, max)=> {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	  }

	const countchek =()=> {
		let newcount = count-1;
		let countgift= randomInteger(1, 70 );
		if(newcount<=0){
			newcount=-1;
		}
		connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": newcount.toString() });
		setCount(newcount);
		connect.sendPromise("VKWebAppStorageSet", {"key": "date", "value": (+ new Date()).toString() });
		setGift(StateBase[countgift])
		console.log(countgift);
		
	}

	const checkTime =()=> {
			connect.sendPromise("VKWebAppStorageSet", {"key": "count", "value": "4" });
	}
	const setNewPopout =()=> {
		setPopout(<ScreenSpinner size="large" />);
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} count={count} countchek={countchek} time={time} checkTime={checkTime} setNewPopout={setNewPopout} />
			<Gift id='gift' go={go} gift={gift} />
		</View>
	);
}

export default App;

