import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import userModel from './model/UserModel';


userModel.getCurrentUser().then(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
});


