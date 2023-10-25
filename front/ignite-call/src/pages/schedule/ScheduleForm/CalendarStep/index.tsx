import dayjs from 'dayjs'
import { useState } from 'react'
import { Calendar } from '../../../../components/Calendar'
import {
  Container,
  TimePickerItem,
  TimePickerList,
  TimerPicker,
  TimerPickerHeader,
} from './styles'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const hasSelectedDate = !!selectedDate

  const weekDay = hasSelectedDate ? dayjs(selectedDate).format('dddd') : null
  const expansiveDate = hasSelectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={hasSelectedDate}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {hasSelectedDate && (
        <TimerPicker>
          <TimerPickerHeader>
            {weekDay} <span>{expansiveDate}</span>
          </TimerPickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
            <TimePickerItem>19:00h</TimePickerItem>
            <TimePickerItem>20:00h</TimePickerItem>
          </TimePickerList>
        </TimerPicker>
      )}
    </Container>
  )
}
