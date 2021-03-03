import React from 'react'
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom'

import {AuthProvider} from '../contexts/AuthContext'


import Cnavbar from './Cnavbar'
import CHomepage from './CHomepage'
import CConferences from './CConferences'
import CTalks from './CTalks'
import CMedia from './CMedia'
import CLogin from './CLogin'
import CPrivateRoute from './CPrivateRoute'

export default function Crouter() {
    return (
        <Router>

            <AuthProvider>

            <Cnavbar />
            <Switch>

            <CPrivateRoute path="/" exact component={CHomepage} />
            <CPrivateRoute path="/conferences" exact component={CConferences} />
            <CPrivateRoute path="/talks" exact component={CTalks} />
            <CPrivateRoute path="/media" exact component={CMedia} />

            <Route path="/login" exact component={CLogin}>
            </Route>
            </Switch>
            </AuthProvider>
        </Router>
    )
}
