import { useState } from 'react';

function Tabs(props) {
    const [activeTab, setActiveTab] = useState('')

    function handleClick(label) {
        setActiveTab(label)
        console.log(label)
        console.log(activeTab)
    }

    return (
        <div className="tabs">
            <div>
                {
                    props.children
                        .map(element => {
                            return (<button key={element.props.label} onClick={() => handleClick(element.props.label)}>{element.props.label}</button>)
                        })
                }
            </div>
            <div>
                {props.children.map(child => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.childen;
                })}
            </div>
        </div>
    )
}

export default Tabs;