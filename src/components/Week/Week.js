import React, {Component} from 'react';
import Icon from '../Icon';
import DayOfTheWeek from './week-sub-components/DayOfTheWeek';
import LowHighTemp from './week-sub-components/LowHighTemp';

class Week extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.week !== nextProps.week) {
      return true;
    }

    return false;
  }
  render() {
    return (
      <ul className="w-widget-week-forecast">
        {this
          .props
          .week
          .map(obj => (
            <li key={obj.id} className={obj.skyClass}>
              <div className="w-widget-inner">
                <DayOfTheWeek dayOfWeek={obj.day.dayOfWeek}/>
                <Icon className='w-widget-climacon' icon={obj.icon} />
                <LowHighTemp minTemp={obj.minTemp} maxTemp={obj.maxTemp}/>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}

export default Week;