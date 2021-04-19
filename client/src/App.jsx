// gerekli kütüphaneler
import React from 'react'
import { connect } from 'react-redux'
import * as noteActions from './redux/actions/noteActions'
import { bindActionCreators } from 'redux'
import * as uuid from 'uuid'
import './App.css'
import Item from './components/Item'
class App extends React.Component {
    state = {
        notes: [],
        newNote: "",
        area: "",
        selectedIndex: 0
    }
    componentDidMount = () => {
        this.props.actions.getNotes().then(() => {
            if (this.props.notes.length > 0) {
                this.setState(() => {
                    return {
                        notes: this.props.notes,
                    }
                })
            }
            this.setState((state) => {
                return { area: state.notes.length > 0 ? state.notes[0].content: "Hiç not yok yeni not eklemek için not adı girip yeni not oluştura tıklayınız" }
            })
        })
    }

    save = () => {

        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            return { notes: data }
        })
        this.props.actions.createNote(this.state.notes)
        alert("Bütün notlar kaydedildi !")
    }
    changeSelected = (id) => {
        var note = this.state.notes.find(n => n.id == id)
        var index = this.state.notes.indexOf(note)

        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            return { notes: data }
        })
        this.setState((state) => { return { area: state.notes[index].content, selectedIndex: index } })
    }
    handleOnChange = (e) => {
        e.preventDefault()
        this.setState({ area: e.target.value })
    }


    create = () => {
        if (this.state.newNote != "") {
            this.setState((state) => {
                state.notes = this.state.notes
                state.selectedIndex = state.notes.length
                state.area = ""
                return state.notes = [...state.notes, { id: uuid.v4(), doc: state.newNote + ".md", content: "" }]

            })
            this.setState({ newNote: "" })
        }
        else {
            alert("Not Adı Girilmedi !!!")
        }
    }
    render = () => {
        return (
            <>
                <nav className="navbar navbar-light bg-indigo">
                    <div className="container-fluid">
                        <a className="navbar-brand text-white" href="#">Notebook - v2</a>
                    </div>
                </nav>
                <div className="container-fluid content-center">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-4 col-lg-4 col-xxl-4 mt-4">
                            <h5 className="card-title text-white">Yeni Not</h5>
                            <div className="container-fluid mt-4 custom-block">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-8 col-md-8 mx-zero">
                                        <input type="text" placeholder="Not adı giriniz" className="form-control color-grey" value={this.state.newNote} onChange={(e) => this.setState({ newNote: e.target.value })} />
                                    </div>
                                    <div className="col-sm-12 col-xl-4 col-md-4 mx-zero">
                                        <button className="form-control btn color-b" onClick={() => this.create()}>Yeni Not</button>
                                    </div>
                                </div>
                            </div>
                            <h5 className="card-title text-white mt-4">Notlar</h5>
                            <div className="mt-4">
                                {this.state.notes.map(
                                    (note, index) => <Item
                                        selectedItem = {index == this.state.selectedIndex ? true : false}
                                        changeSelected={this.changeSelected}
                                        key={index}
                                        id={note.id}
                                        note={note} />)}
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-xl-8 col-lg-8 col-xxl-8 mt-4">
                            <h5 className="card-title text-white">Not İçeriği</h5>
                            <textarea className="form-control mt-4 color-grey" placeholder="Notunuzu giriniz" onChange={(e) => this.handleOnChange(e)} name="" id="" value={this.state.area} rows="13"></textarea>
                            <button className="btn text-white btn-purple custom-btn text-center mt-2 mb-5 " disabled={this.state.notes.length < 1 ? true : false } onClick={() => this.save()}>Kaydet</button>
                        </div>
                    </div>
                </div>

            </>
        )
    }

}




const mapStateToProps = (state) => {
    return {
        notes: state.notes
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getNotes: bindActionCreators(noteActions.getNotes, dispatch),
            createNote: bindActionCreators(noteActions.createNote, dispatch)

        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(App)

