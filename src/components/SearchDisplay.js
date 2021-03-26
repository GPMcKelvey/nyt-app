import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle} from 'reactstrap';

const SearchDisplay = (props) => {
console.log(props);

    let items = props.result;
    return (
        <div>
            {
                items.map((article, index) => (
                    <div key={index}>
                    <Card>
                        <CardImg top width="100%" src={`http://www.nytimes.com/${article.multimedia[0].url}
                        `} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5" ><a href={article.web_url} target="_blank">{article.headline.main}</a></CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">
                                    <p>Keywords:</p>
                                    {
                                        article.keywords.map((word, indexB) => (
                                            <p key={indexB}>{word.value}</p>
                                        ))
                                    }
                                </CardSubtitle>
                                <CardText>{article.snippet}</CardText>
                            </CardBody>
                    </Card>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchDisplay;

//{article.multimedia[19].url} 