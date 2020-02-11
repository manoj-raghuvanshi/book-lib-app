import {Link, Route, Switch, withRouter } from 'react-router-dom'
import SearchComponent from './components/book-search'
import AddBookComponent from './components/add-book'
import React, {useEffect} from 'react'

function Routes(props: { history: any }) {
    const {history} = props;

    return (
        <>
            <div className="header">
                <Link to={'/'} className="logo">
                    Book Library
                </Link>
                <div className="header-right">
                    <Link
                        className={
                            history.location.pathname.indexOf('add-book') > -1
                                ? 'active'
                                : ''
                        }
                        to="/add-book"
                    >
                        Add a book
                    </Link>
                </div>
            </div>
            <Switch>
                <Route exact path="/" component={SearchComponent} />
                <Route exact path="/add-book" component={AddBookComponent} />
            </Switch>
        </>
    )
}

export default withRouter(Routes);
