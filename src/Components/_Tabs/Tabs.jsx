import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab/Tab';
// import ReactDOM from 'react-dom/client';
import '../../CSS/tabs.css';
import '../../CSS/scroll.css';
import Socoban from '../Socoban/Socoban';
import Spot from '../Spot/Spot';
import Rotms from '../Rotms/Rotms';

export default class Tabs extends Component {
  static games = ['Socoban','Spot','Rotms'];
  
  static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
      }
    
      constructor(props) {
        super(props);
    
        this.state = {
          activeTab: this.props.children[0].props.label,
        };
      }
    
      onClickTabItem = (tab) => {
        console.log(tab);
        this.setState({ activeTab: tab });
        //if (tab === 0) this.activeGame = <Socoban />
        //if (tab === 1) this.activeGame = <Spot />
        //if (tab === 2) this.activeGame = <Rotms />
      }


  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>

        <div id="tabs-2" style={{display: (activeTab === 'Spot') ? "block" : "none"}}>
            <div className="board">
              <Spot />  
            </div>
        </div>

        
      </div>
    );
  }
}
