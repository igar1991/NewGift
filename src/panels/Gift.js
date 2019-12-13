import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { useState, useEffect } from 'react';
import persik from '../img/persik.png';
import './Persik.css';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import connect from '@vkontakte/vk-connect';



const osName = platform();

const Gift = (props) => {
	console.log(props.gift)
	const blobToBase64 =(blob, cb)=> {
		var reader = new FileReader();
		reader.onload = function() {
		var dataUrl = reader.result;
		var base64 = dataUrl.split(',')[1];
		cb(base64);
		};
		reader.readAsDataURL(blob);
	};

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}
			>{props.gift.text}
			</PanelHeader>
			<canvas id="gameCanvas"></canvas>
			<img src={props.gift.src} />
			<Button size="xl" level="2" onClick={() => {
				console.log("1");
				
				const canvas = document.getElementById('gameCanvas');
				const ctx = canvas.getContext('2d');
				ctx.fillRect(25,25,100,100);
                ctx.clearRect(45,45,60,60);
				ctx.strokeRect(50,50,50,50);
				canvas.toBlob(function(blob) {
					console.log("2");
					blobToBase64(blob, (base64)=> {
                        console.log("3");
						connect.sendPromise("VKWebAppShowStoryBox", { "background_type" : "image", "url" : "https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg" }).then(result=>{
							console.log(result);
							console.log("4");
							
						}).catch(res=> {
							console.log(res);
							
						})
					})
					console.log("5");

				});

			}}>
				Открыть
					</Button>
		</Panel>
	);
}

Gift.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Gift;
