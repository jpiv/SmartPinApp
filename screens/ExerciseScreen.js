import React, { Component } from 'react'
import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { withNavigation, StackActions } from 'react-navigation'
import notify from '../tools/notify'
import http from '../tools/http'

class ExerciseScreen extends Component {
	static navigationOptions = { header: null }
	backListener = null
	state = {
		sets: []
	}

	componentDidMount() {
    	const { navigation } = this.props
    	const toWorkout = StackActions.push({ routeName: 'Workout' })
        this.backListener = BackHandler.addEventListener('hardwareBackPress', () => navigation.dispatch(toWorkout))
        this.handleRep()
        notify.connect()
        notify.sub('rep', this.handleRep.bind(this))
	}

	componentWillUnmount() {
		this.backListener.remove()
	}

	async handleRep() {
		const { sets } = await http.get('/exercises')
		this.setState({ sets })
	}

	renderSetTable() {
		const { sets } = this.state
		return sets.map(({ reps, weight}, i) =>
			<View key={ i } style={ st.tableRow }>
				<Text style={ st.tableHeader }>
					{ i + 1 }
				</Text>
				<Text style={ st.tableHeader }>
					{ reps }
				</Text>
				<Text style={ st.tableHeader }>
					{ weight }
				</Text>
			</View>
		)
	}

	render() {
		return (
			<View style={ st.container }>
				<Text style={ st.title }>
					Row
				</Text>
				<View style={ st.infoContainer }>
					<Text style={ st.infoTitle }>
						Calories Burned: 0
					</Text>
					<View style={ st.tableRow }>
						<Text style={ st.tableHeader }>
							Sets
						</Text>
						<Text style={ st.tableHeader }>
							Reps
						</Text>
						<Text style={ st.tableHeader }>
							Weight
						</Text>
					</View>
					{ this.renderSetTable() }
					<Text style={ st.infoTitle2 }>
						Progress...
					</Text>
				</View>
			</View>
		)
	}
}

const st = StyleSheet.create({
	container: {
		flex: 1,
        paddingTop: 15,
        backgroundColor: '#F9D400',
	},
	infoContainer: {
		flex: 1,
	},
	tableRow: {
		flex: 0,
		flexDirection: 'row',
	},
	title: {
		fontSize: 44,
		height: 100,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	tableHeader: {
		fontSize: 30,
		width: 50,
		flex: 1,
		textAlign: 'center',
	},
	infoTitle: {
		textAlign: 'center',
		fontSize: 30,
		marginTop: 10,
		marginBottom: 10,
		flex: 0,
	},
	infoTitle2: {
		fontSize: 10,
		textAlign: 'center',
		marginTop: 60,
		marginBottom: 10,
		flex: 0,
	}
})

export default withNavigation(ExerciseScreen)
