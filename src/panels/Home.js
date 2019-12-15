import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './Persik.css';
import ded from '../img/670.jpg';

const Home = ({ id, go, fetchedUser, count, countchek, time }) => (
	<Panel id={id}>

		<PanelHeader>Дед мороз</PanelHeader>
		{fetchedUser &&
			<div className="des">
				{`Привет ${fetchedUser.first_name}! Давай посмотрим что тебе подарит Дед Мороз!`}
			</div>}

		<Group className="description">
			<img className="ded" src={ded} alt="ded" />
			<div className="description">
				Подарков под ёлкой: {count}
				
			</div>
			
			{ count>0 &&<Button size="xl" level="destructive" onClick={(e) => {
				go(e);
				countchek();
			}} data-to="gift">
				Открыть
				</Button>}
			{count<=0 && <p className="des">У вас нет подарков:( Новый подарок через {time} минут!</p>}	
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
