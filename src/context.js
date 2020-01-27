import React, { Component } from "react";
import items from "./data";
// Context es una forma de pasar datos que pueden considerarse Globales a un árbol de componentes sin la necesidad de utilizar Redux.
const RoomContext = React.createContext(); // se crea el contexto

// Encerrara el componente al que se pasaran los datos
class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  };
  // get Data
  componentDidMount() {
    let rooms = this.formatData(items); // retorna tempItems
    let featuredRooms = rooms.filter(room => room.featured === true);
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id; // el id del item
      let images = item.fields.images.map(image => image.fields.file.url); // retorna un array con los url de las images
      let room = { ...item.fields, images, id }; // copia todos los fields y añade id e images
      return room; // retorna objeto con los atributos de room
    });
    return tempItems; // al retornar tempItemas tambien retorna room
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms]
    const room = tempRooms.find(room => room.slug === slug)
    return room
  }

  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
// Permite consumir los datos en cualquier componente del arbol de componentes
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
