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
	const historyGet=()=> {
		connect.sendPromise("VKWebAppShowStoryBox", 
				{ "background_type": "image", 
				"url": "https://sun9-8.userapi.com/c205820/v205820168/11de9/u3XldP7BvHw.jpg", 
				"attachment":{"text":"hello", "type":"url", "url":"https://vk.com/app7239249"} 
			})}
	
	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}
			>{props.gift.text}
			</PanelHeader>
			<Button size="xl" level="2" onClick={historyGet}>
				Открыть
			</Button>
		</Panel>
	)};

Gift.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Gift;
