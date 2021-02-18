import React from 'react'
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom'


import Cnavbar from './Cnavbar'
import CHomepage from './CHomepage'
import CConferences from './CConferences'
import CTalks from './CTalks'
import CMedia from './CMedia'

export default function Crouter() {
    return (
        <Router>
            <Cnavbar />

            <Switch>
            <Route path="/" exact>
            <CHomepage />
            </Route>
            <Route path="/conferences" exact>
            <CConferences />
            </Route>
            <Route path="/talks" exact>
            <CTalks />
            </Route>
            <Route path="/media" exact>
            <CMedia />
            </Route>
            </Switch>
        </Router>
    )
}
