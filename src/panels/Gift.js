import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import './Persik.css';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import connect from '@vkontakte/vk-connect';



const osName = platform();

const Gift = (props) => {
	const historyGet = () => {
		connect.sendPromise("VKWebAppShowStoryBox",
			{
				"background_type": "image",
				"url": props.gift.id,
				"attachment": { "text": "hello", "type": "url", "url": "https://vk.com/app7239249" }
			})
	};

	return (
		<Panel id={props.id}>
			<PanelHeader
				left={<HeaderButton onClick={props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
				</HeaderButton>}
			>Ваш подарок
			</PanelHeader>
			<Div>
				<img src={props.gift.id} alt={props.gift.text} width="100%" />

				<Button size="xl" level="destructive" onClick={historyGet}>
				<Icon24Share />В ИСТОРИЮ
			    </Button>
			</Div>
		</Panel>
	)
};

Gift.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Gift;
