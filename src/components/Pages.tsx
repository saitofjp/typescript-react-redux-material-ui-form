import * as React from 'react';
import FirstForm from '../containers/FirstForm';
import { MaterialUis } from './MaterialUis';


export const
    Contact = () => <div><h2>Contact</h2>
    <div>
        submit後に、reduxのactionが起動している。
        <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon">公式拡張で見ると面白いよ</a>
    </div>
    <div><FirstForm /></div>
    </div>

export const
    About = () => <div><h2>About</h2>

    <MaterialUis />
    </div>