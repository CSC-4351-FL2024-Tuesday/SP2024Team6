/* eslint-disable camelcase */
import { StyleSheet } from 'react-native'

const class_styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerClassContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  classItem: {
    width: '48%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: '1%'
  }
})

export default class_styles
