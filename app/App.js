import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, MD2LightTheme } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { es, registerTranslation } from 'react-native-paper-dates';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import humanizeDuration from 'humanize-duration';
import Section from './src/Section';
import DateTimeSection from './src/DateTimeSection';

require('dayjs/locale/es');
dayjs.locale('es');
dayjs.extend(duration);
registerTranslation('es', es);

const INITIAL_DATE = new Date();
INITIAL_DATE.setSeconds(0);
INITIAL_DATE.setMilliseconds(0);

export default function App() {
  const [dates, setDates] = React.useState({
    real: INITIAL_DATE,
    dvr: INITIAL_DATE,
    start: INITIAL_DATE,
    end: INITIAL_DATE,
  });
  const [diff, setDiff] = React.useState(0);
  const [humanDiff, setHumanDiff] = React.useState('');

  const handleSetDate = (key, date) => {
    setDates({ ...dates, [key]: date });
  };

  React.useEffect(() => {
    const { real, dvr } = dates;
    const diff = dayjs(dvr).diff(dayjs(real));
    const duration = dayjs.duration(diff);
    setDiff(diff);

    const human = humanizeDuration(duration.asMilliseconds(), { language: 'es' });
    setHumanDiff(duration.asMilliseconds() < 0 ? `-${human}` : human);
  }, [dates]);

  return (
    <PaperProvider
      theme={{
        ...MD2LightTheme,
        colors: {
          primary: '#0ea5e9',
        },
      }}
    >
      <Appbar.Header mode="small" elevated>
        <Appbar.Content title="InField Toolkit" />
      </Appbar.Header>

      <View style={styles.container}>
        <DateTimeSection
          label="FECHA Y HORA REAL"
          backgroundColor="#f0fdfa"
          id="real"
          handleSetDate={handleSetDate}
        />
        <DateTimeSection
          label="FECHA Y HORA DVR"
          backgroundColor="#f7fee7"
          id="dvr"
          handleSetDate={handleSetDate}
        />
        <Section label="DESFASE" value={humanDiff} backgroundColor="#f8fafc" />
        <DateTimeSection
          label="INICIO REAL"
          backgroundColor="#fffbeb"
          id="start"
          handleSetDate={handleSetDate}
        />
        <Section
          label="DVR"
          value={dayjs(dates.start).add(diff, 'ms').format('dddd, DD [de] MMMM [de] YYYY HH:mm')}
          backgroundColor="#fffbeb"
        />
        <DateTimeSection
          label="FIN REAL"
          backgroundColor="#f0f9ff"
          id="end"
          handleSetDate={handleSetDate}
        />
        <Section
          label="DVR"
          value={dayjs(dates.end).add(diff, 'ms').format('dddd, DD [de] MMMM [de] YYYY HH:mm')}
          backgroundColor="#f0f9ff"
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    gap: 5,
  },
});
