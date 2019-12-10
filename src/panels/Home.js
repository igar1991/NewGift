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
import ded from '../img/santa.png';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<div className="main">
		<div className="head">Дед мороз</div>
		  {fetchedUser &&
		    <div className="description">
				{`Привет ${fetchedUser.first_name}! знаешь что тебе подарят на новый год?`}
		    </div>}
			<img className="ded" src={ded} alt="ded" />
				<Button size="xl" level="2" onClick={go} data-to="gift">
					Show me the Persik, please
				</Button>
		   </div>
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
