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
	const blobToBase64 = (blob, cb) => {
		var reader = new FileReader();
		reader.onload = function () {
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
			<Button size="xl" level="2" onClick={async () => {
				console.log("1");

				const canvas = document.getElementById('gameCanvas');
				const ctx = canvas.getContext('2d');
				canvas.width = 1440;
				canvas.height = 2160;

				const checkImage = path =>
					new Promise(resolve => {
						const img = new Image();
						img.onload = () => resolve({ path, status: 'ok',img });
						img.onerror = () => resolve({ path, status: 'error' });
						img.crossOrigin="anonymous" ;
						img.src = path;
					});
				const loadedResult = await checkImage(props.gift.src);
				console.log(loadedResult);
				if (loadedResult.status !== 'ok') {
					console.log('ppc hren');
					alert('Image loading error');
					return;

				}

				ctx.drawImage(loadedResult.img, 0, 0, canvas.width, canvas.height)
				canvas.toBlob(function (blob) {
					console.log("2");
					blobToBase64(blob, (base64) => {
						console.log("3");
						connect.sendPromise("VKWebAppShowStoryBox", { "background_type": "image", "blob": base64, "attachment":{"text":"hello", "type":"url", "url":"https://vk.com/app7239249"} }).then(result => {
							console.log(result);
							console.log("4");

						}).catch(res => {
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
