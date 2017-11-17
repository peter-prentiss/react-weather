import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import GoogleMap from '../components/GoogleMap';

class WeatherList extends Component {
    renderWeather(cityData) {
        const temps = cityData.list.map(weather => 1.8 * (weather.main.temp - 273) + 32);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const { lat, lon } = cityData.city.coord;

        return (
            <tr key={cityData.city.id}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <Chart data={temps} color="orange" units="°F" />
                <Chart data={pressures} color="yellow" units="hPa" />
                <Chart data={humidities} color="purple" units="%" />
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (°F)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({weather}) {
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);