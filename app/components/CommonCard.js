import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { moderateScale } from '../functions';

import colors from '../config/colors';

function CommonCard({
  ind,
  onTouch,
  title,
  description,
  onPress,
  descriptionStyle,
}) {
  return onTouch ? (
    <TouchableOpacity onPress={onTouch}>
      <Card
        ind={ind}
        title={title}
        description={description}
        onPress={onPress}
        descriptionStyle={descriptionStyle}
      />
    </TouchableOpacity>
  ) : (
    <Card
      ind={ind}
      title={title}
      description={description}
      onPress={onPress}
      descriptionStyle={descriptionStyle}
    />
  );
}

function Card({ ind, title, description, onPress, descriptionStyle }) {
  return (
    <View key={ind} style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Text style={styles.textTitle}>{title}</Text>
        <TouchableWithoutFeedback onPress={onPress}>
          <AntDesign name="close" size={15} color="black" />
        </TouchableWithoutFeedback>
      </View>
      {description && (
        <Text style={[styles.textDescription, descriptionStyle]}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
    borderWidth: 0.1,
    borderColor: '#cccccc',
  },
  cardTop: {
    flexDirection: 'row',
  },
  textTitle: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 20,
    flexGrow: 1,
  },
  textDescription: {
    marginTop: moderateScale(10),
  },
});

export default CommonCard;
