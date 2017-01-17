import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default ({ score }) => {
	return (
		<footer id="footer">
			<div className="score">
	            <Card>
	                <CardHeader
	                    className="card-score"
	                    title={"Score : " + score}
	                >
	                </CardHeader>
	            </Card>
			</div>
		    <p>Made by world class developers and patriots for the Republic, Lavie, Mat, and Beatrix</p>
		</footer>
	)
}