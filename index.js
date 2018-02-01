import AppViewModel from './app/app';
import view from './app/template.stache';

export default function startup(domNode, debug=false){
    domNode = document.getElementById(domNode) || document.body;
    const app = new AppViewModel;
    domNode.appendChild(view(app));

    if(debug){
        window.app = app;
    }
}