import React from 'react'
import { Paper, Grid, Typography, Divider } from '@material-ui/core'
import { format, differenceInCalendarMonths } from 'date-fns'
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt'
import Month from './Month'
import DefinedRanges from './DefinedRanges'
import { DateRange, DefinedRange, Setter, NavigationAction } from '../types'
import { MARKERS } from '..'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    padding: '20px 70px',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    //@ts-ignore
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    marginBottom: 20,
  },
}))

interface MenuProps {
  dateRange: DateRange
  ranges: DefinedRange[]
  minDate: Date
  maxDate: Date
  firstMonth: Date
  secondMonth: Date
  setFirstMonth: Setter<Date>
  setSecondMonth: Setter<Date>
  setDateRange: Setter<DateRange>
  helpers: {
    inHoverRange: (day: Date) => boolean
  }
  handlers: {
    onDayClick: (day: Date) => void
    onDayHover: (day: Date) => void
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void
  }
}

const Menu: React.FunctionComponent<MenuProps> = (props) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
  } = props

  const classes = useStyles()
  const { startDate, endDate } = dateRange
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2
  const commonProps = { dateRange, minDate, maxDate, helpers, handlers }
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <Grid container className={classes.header} alignItems="center">
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'mmmm dd, yyyy') : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item className={classes.headerItem}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'mmmm dd, yyyy') : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justify="center" wrap="nowrap">
            {/* @ts-ignore */}
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <div className={classes.divider} />
            {/* @ts-ignore */}
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Menu
