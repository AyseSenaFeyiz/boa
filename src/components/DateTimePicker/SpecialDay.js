import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase } from '@boa/base';
import { Divider } from '@boa/components/Divider';
import {
  cloneDate,
  getFirstDayOfMonth,
  getMonthsShort,
  getDatePickerStyle,
  getDayList,
} from './dateUtils';

const dayType = {
  EmptyDay: -1,
  WorkDay: 0,
  WeekendDay: 1,
  Holiday: 2,
  Eve: 3,
  ReliHoliday: 4,
};

function getStyles(props, type) {
  const datePicker = getDatePickerStyle(props.context);
  const dateTextColor = datePicker.DateTextColor;
  const EveHolidayBoxColor = datePicker.calEve;
  const HolidayBoxColor = datePicker.calHoliday;
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderTop: `1px solid ${dateTextColor}`,
      borderBottom: `1px solid ${dateTextColor}`,
      paddingTop: 12,
      paddingBottom: 12,
    },
    child: {
      display: 'flex',
      flexDirection: 'row',
      marginleft: 1,
      alignItems: 'center',
      marginTop: -2,
    },
    item: {
      height: 24,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemDate: {
      fontSize: 11,
      color: props.context.theme.boaPalette.base300,
      marginLeft: 4,
    },
    itemDescription: {
      opacity: 1,
      fontSize: 11,
      color: props.context.theme.boaPalette.base450,
      marginLeft: 4,
    },
    Box: {
      width: 10,
      height: 10,
      background: type === dayType.Eve ? EveHolidayBoxColor : HolidayBoxColor,
    },
  };
}

class SpecialDay extends ComponentBase {
  static propTypes = {
    calendarInfo: PropTypes.array,
    DateTimeFormat: PropTypes.func.isRequired,
    format: PropTypes.string,
    selectedDate: PropTypes.object.isRequired,
    specialDayType: PropTypes.number,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
    calendarInfo: [],
  };

  getSpecialDayList(calendarInfo, selectedDate) {
    const styleEve = getStyles(this.props, dayType.Eve);
    const styleHoliday = getStyles(this.props, dayType.Holiday);
    const betweenDayCount = 5;
    const returnObject = [];
    const EveList = getDayList(calendarInfo, selectedDate, dayType.Eve, betweenDayCount);
    const HolidayList = getDayList(calendarInfo, selectedDate, dayType.Holiday, betweenDayCount);
    const Eve = this.getHoliday(EveList, styleEve);
    const Holiday = this.getHoliday(HolidayList, styleHoliday);
    if (Eve && Eve.length > 0) returnObject.push(Eve);
    if (Holiday && Holiday.length > 0) returnObject.push(Holiday);
    return returnObject;
  }

  getHoliday(Mainlist, style) {
    const MainDiv = [];
    for (let i = 0; i < Mainlist.length; i++) {
      let eveItem;
      const list = Mainlist[i];
      if (list.length > 1) {
        eveItem = this.getMultiHoliday(list, style);
      } else {
        eveItem = this.getSingleHoliday(list, style);
      }
      MainDiv.push(eveItem);
    }
    return MainDiv;
  }

  getMultiHoliday(list, style) {
    const itemOne = list[0];
    const itemOneDate = new Date(itemOne.day);
    const itemTwo = new Date(list[list.length - 1].day);
    const HolidayName = itemOne.description ? itemOne.description.replace('1*', '') : '';

    const MonthNameList = getMonthsShort(itemOneDate, this.props.format);
    const MonthName = MonthNameList[itemOneDate.getMonth()];
    const beginDay = itemOneDate.getDate();
    const EndDay = itemTwo.getDate();
    const multiHoliday = (
      <div style={style.item}>
        <div style={style.Box} />
        <div style={style.child}>
          <div style={Object.assign({}, style.itemDate, { marginLeft: 6 })}>
            {beginDay}-{EndDay} {MonthName}
          </div>
          <div style={Object.assign({}, style.itemDate, { marginLeft: 0 })}>:</div>
          <div style={style.itemDescription}>{HolidayName}</div>
        </div>
      </div>
    );
    return multiHoliday;
  }

  getSingleHoliday(list, style) {
    const itemOne = list[0];
    const itemOneDate = new Date(itemOne.day);
    const HolidayName = itemOne.description ? itemOne.description.replace('1*', '') : '';
    const MonthNameList = getMonthsShort(itemOneDate, this.props.format);
    const MonthName = MonthNameList[itemOneDate.getMonth()];
    const beginDay = itemOneDate.getDate();
    const monthStyle = Object.assign({}, style.itemDate, { marginLeft: 6 });
    const singleHoliday = (
      <div style={style.item}>
        <div style={style.Box} />
        <div style={style.child}>
          <div style={monthStyle}>
            {beginDay} {MonthName}
          </div>
          <div style={Object.assign({}, style.itemDate, { marginLeft: 0 })}>:</div>
          <div style={style.itemDescription}>{HolidayName}</div>
        </div>
      </div>
    );
    return singleHoliday;
  }

  render() {
    const monthFirstDate = cloneDate(getFirstDayOfMonth(this.props.selectedDate));

    const specialDays = this.getSpecialDayList(this.props.calendarInfo, monthFirstDate);

    return (
      <div>
        {specialDays.length === 0 && (
          <Divider
            context={this.props.context}
            style={{
              width: 'calc(100%)',
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 12,
            }}
          />
        )}
        {specialDays.length > 0 && (
          <div>
            <Divider
              context={this.props.context}
              style={{
                width: 'calc(100% + 24px)',
                marginBottom: 12,
                marginLeft: -12,
                marginRight: -12,
                marginTop: 14,
              }}
            />
            {specialDays}
            <Divider
              context={this.props.context}
              style={{
                width: 'calc(100% + 24px)',
                marginBottom: 0,
                marginLeft: -12,
                marginRight: -12,
                marginTop: 12,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SpecialDay;
