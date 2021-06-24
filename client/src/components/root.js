import { BrowserRouter as  Router, Switch, Route} from 'react-router-dom'
import { history } from '../history'

import register from '../pages/register'
import home from '../pages/home'
import escola from '../pages/escola'

const root = () => (
    <Router history={ history }>
        <Switch>
            <Route exact path="/register" exact component={register}/>
            <Route exact path="/" exact component={home}/>
            <Route exact path="/escola" exact component={escola}/>
        </Switch>
    </Router>
)

export default root
 