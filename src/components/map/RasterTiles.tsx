import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

const styles = StyleSheet.create({
  slider: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    maxHeight: 60,
    paddingHorizontal: 24,
  },
});

class RasterTiles extends React.Component {

  render() {
    const rasterSourceProps = {
      id: 'stamenWatercolorSource',
      tileUrlTemplates: [
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      ],
      tileSize: 256,
    };

    return (
      <View {...this.props}>
        <MapboxGL.MapView>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[50, 7]}
          />

          <MapboxGL.RasterSource {...rasterSourceProps}>
            <MapboxGL.RasterLayer
              id="stamenWatercolorLayer"
              sourceID="stamenWatercolorSource"
            />
          </MapboxGL.RasterSource>
        </MapboxGL.MapView>
      </View>
    );
  }
}

export default RasterTiles;