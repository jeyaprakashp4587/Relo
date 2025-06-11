import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import moment from 'moment-timezone';
import {color} from '../Const/Color';
import {Font} from '../Const/Font';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const {width, height} = Dimensions.get('window');
  const getNextSundayMidnight = () => {
    let now = moment().tz('Asia/Kolkata');
    let nextSunday = moment()
      .tz('Asia/Kolkata')
      .endOf('week')
      .set({hour: 23, minute: 59, second: 59});

    if (now.isAfter(nextSunday)) {
      nextSunday = nextSunday.add(1, 'week');
    }

    return nextSunday;
  };

  const updateCountdown = () => {
    const now = moment().tz('Asia/Kolkata');
    const endTime = getNextSundayMidnight();
    const duration = moment.duration(endTime.diff(now));

    const hours = Math.floor(duration.asHours()) % 24;
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const days = Math.floor(duration.asDays());

    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        padding: 1,
        rowGap: 10,
        marginVertical: 20,
      }}>
      <Text
        style={{
          fontSize: width * 0.04,
          color: 'rgba(56, 61, 61, 0.78)',
          letterSpacing: 0.3,
        }}>
        ⏳ Next Weekly Reset In:
      </Text>
      <Text
        style={{
          fontSize: width * 0.04,
          color: color.white,
          fontFamily: Font.Medium,
          letterSpacing: 0.3,
        }}>
        {timeLeft}
      </Text>
    </View>
  );
};

export default CountdownTimer;
