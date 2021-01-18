import React, {ChangeEvent} from 'react'
import './App.css'
import {connect} from 'react-redux'
import Display from './components/Display/Display'
import Counter from './components/Counter/Counter'
import Settings from './components/Settings/Settings'
import {RootState} from './store/reducers'
import {getSettings, changeNumber, changeSettings} from './store/reducers/counterReducer'
import {ICurrentValue, ISettingsValue} from './entities/entities'

interface IMSTP {
  currentValue: number
  startValue: number
  maxValue: number
}

interface IMDTP {
  getSettings: () => void
  changeNumber: (newValue: ICurrentValue) => void
  changeSettings: (newValue: ISettingsValue) => void
}

class App extends React.Component<IMSTP & IMDTP> {

  state = {
    startValue: 0,
    maxValue: 0,
    currentValue: '',
    settings: false,
    classForSet: false
  }

  componentDidMount(): void {
    this.props.getSettings()
  };

  changeValue = (number: number): void => {
    let newValue = {currentValue: this.props.currentValue + number}
    if (newValue.currentValue <= this.props.maxValue && newValue.currentValue >= this.props.startValue) {
      this.props.changeNumber(newValue)
    }
  }

  onResetPush = (): void => {
    if (this.props.currentValue !== this.props.startValue) {
      this.props.changeNumber({currentValue: this.props.startValue})
    }
  }

  onSetPush = (): void => {
    this.setState({
      settings: true, classForSet: false, currentValue: 'enter values and press \'Save\'',
      startValue: this.props.startValue, maxValue: this.props.maxValue
    })
  }

  onSetStartValue = (e: ChangeEvent<HTMLInputElement>) => {
    let newStartValue = Number(e.currentTarget.value)
    if (newStartValue < 0 || newStartValue >= this.state.maxValue) {
      this.setState({startValue: newStartValue, currentValue: 'Incorrect value!', classForSet: true})
    } else {
      this.setState({
        startValue: newStartValue,
        currentValue: 'enter values and press \'Save\'',
        classForSet: false
      })
    }
  }

  onSetMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    let newMaxValue = Number(e.currentTarget.value)
    if (newMaxValue <= this.state.startValue) {
      this.setState({maxValue: newMaxValue, currentValue: 'Incorrect value!', classForSet: true})
    } else {
      this.setState({
        maxValue: newMaxValue,
        currentValue: 'enter values and press \'Save\'',
        classForSet: false
      })
    }
  }

  addNewSettings = () => {
    this.props.changeSettings({
      currentValue: this.state.startValue,
      startValue: this.state.startValue,
      maxValue: this.state.maxValue
    })
    this.setState({classForSet: false, settings: false})
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <Display classForSet={this.state.classForSet}
                   maxValue={this.props.maxValue}
                   settings={this.state.settings}
                   currentValue={this.state.settings ? this.state.currentValue : this.props.currentValue}/>
          {!this.state.settings
            ? <Counter currentValue={this.props.currentValue}
                       startValue={this.props.startValue}
                       maxValue={this.props.maxValue}
                       changeValue={this.changeValue}
                       onResetPush={this.onResetPush}
                       onSetPush={this.onSetPush}/>
            : <Settings startValue={this.state.startValue}
                        maxValue={this.state.maxValue}
                        classForSet={this.state.classForSet}
                        onSetStartValue={this.onSetStartValue}
                        onSetMaxValue={this.onSetMaxValue}
                        addNewSettings={this.addNewSettings}/>}
        </div>
      </div>
    )
  }
}

const mstp = (state: RootState): IMSTP => {
  return {
    currentValue: state.counter.currentValue,
    maxValue: state.counter.maxValue,
    startValue: state.counter.startValue
  }
}

export default connect<IMSTP, IMDTP, {}, RootState>(mstp,
  {getSettings, changeNumber, changeSettings})(App)

