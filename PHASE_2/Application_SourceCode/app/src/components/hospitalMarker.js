import React from 'react'
import hospitalRed from '../mapIcons/hospitalRed.png'
import hospitalOrange from '../mapIcons/hospitalOrange.png'
import hospitalGreen from '../mapIcons/hospitalGreen.png'
import InfoBox from './infoBox'
import { getBedsCapacityRatio, getDistanceToSelectedSuburb } from '../helpers'
import allNswAreas from '../datasets/nswAreas'

class HospitalMarker extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isInfoDisplayed: false
        }

        this.openInfo = this.openInfo.bind(this)
        this.closeInfo = this.closeInfo.bind(this)
    }

    openInfo(){
        this.setState({isInfoDisplayed: true})
    }

    closeInfo(){
        this.setState({isInfoDisplayed: false})
    }

    render() {
        let { lat, lng, selectedSuburb } = this.props
        let bedsAvailable = this.props.bedsAvailable
        let totalBeds = this.props.totalBeds
        let bedsRatio = getBedsCapacityRatio(bedsAvailable, totalBeds)
        let distanceToSuburb = 0
        
        if (selectedSuburb.length !== 0) {
            distanceToSuburb = getDistanceToSelectedSuburb(lat, lng, selectedSuburb, allNswAreas)
        }

        return (
            <div className="hospital-marker">
                {/* If bedsRatio > 0.7, show GREEN, if > 0.3 && <= 0.7, show ORANGE, else show RED */}
                { bedsRatio > 0.7 ?
                    <img id={this.props.name} alt="marker" src={hospitalGreen} onClick={ this.openInfo } ></img>
                : bedsRatio > 0.3 && bedsRatio <= 0.7 ?
                    <img id={this.props.name} alt="marker" src={hospitalOrange} onClick={ this.openInfo } ></img>
                :
                    <img id={this.props.name} alt="marker" src={hospitalRed} onClick={ this.openInfo } ></img>
                }
                {this.state.isInfoDisplayed ?
                <InfoBox
                    name = {this.props.name}
                    closeInfoDisplayed = {this.closeInfo}
                    totalBeds = {this.props.totalBeds}
                    bedsAvailable = {this.props.bedsAvailable}
                    suburb = {this.props.suburb}
                    distanceToSuburb = {distanceToSuburb}
                />
                :
                null}
            </div>
        )
    }
}

export default HospitalMarker
