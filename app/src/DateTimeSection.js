import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { es, registerTranslation } from 'react-native-paper-dates';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

require('dayjs/locale/es');
dayjs.locale('es');
dayjs.extend(duration);
registerTranslation('es', es);

const INITIAL_DATE = new Date();
INITIAL_DATE.setSeconds(0);
INITIAL_DATE.setMilliseconds(0);

function DateTimeSection({ label, id, handleSetDate, backgroundColor }) {
  const [value, setValue] = React.useState(undefined);
  const [date, setDate] = React.useState(INITIAL_DATE);
  const [time, setTime] = React.useState({ hours: dayjs().hour(), minutes: dayjs().minute() });
  const [openDate, setOpenDate] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);

  React.useEffect(() => {
    if (date && time) {
      const dateWithTime = dayjs(date)
        .set('hour', time.hours)
        .set('minute', time.minutes)
        .set('second', 0)
        .set('millisecond', 0);

      setValue(dateWithTime);
      handleSetDate(id, dateWithTime);
    }
  }, [date, time]);

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Text variant="labelLarge">{label}</Text>
      <View style={styles.row}>
        <Text style={{ flexGrow: 1 }}>
          {value ? value.format('dddd, DD [de] MMMM [de] YYYY HH:mm') : 'Seleccionar'}
        </Text>
        <IconButton icon="calendar-month" onPress={() => setOpenDate(true)} />
        <IconButton icon="clock-outline" onPress={() => setOpenTime(true)} />
      </View>
      <DatePickerModal
        locale="es"
        mode="single"
        label={label}
        visible={openDate}
        onDismiss={() => setOpenDate(false)}
        date={date}
        onConfirm={(params) => {
          setOpenDate(false);
          setDate(params.date);
        }}
      />
      <TimePickerModal
        locale="es"
        label={label}
        use24HourClock
        visible={openTime}
        onDismiss={() => setOpenTime(false)}
        date={time}
        onConfirm={({ hours, minutes }) => {
          setOpenTime(false);
          setTime({ hours, minutes });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default DateTimeSection;
