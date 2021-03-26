// gerekli kütüphaneler
import React from 'react'
import { connect } from 'react-redux'
import * as noteActions from './redux/actions/noteActions'
import { bindActionCreators } from 'redux'
import * as uuid from 'uuid'
import './App.css'
import Item from './components/Item'
class App extends React.Component {
    //  Sınıfın state yönetimi
    state = {
        // Boş dizi Koruması
        notes: [{
            id: "temp_id_xxx", doc: "temp", content: "temp dosyası önceden oluşturulmuş not varsa silinicektir!! Eğer yoksa yenisini oluşturmak için " +
                " sol kısımda bulunan alana not adı girip yeni not oluştur butonuna tıklayınız ardından eğer kaydetmek isterseniz kaydet butonuna basarak dosyanızı kaydedebilirsini "
        }],
        newNote: "",
        area: "",
        selectedIndex: 0
    }
    // Objeler yerleşince oluşacak işlemler verinin sunucudan getirilmesi ve state in doldurulması
    componentDidMount = () => {
        this.props.actions.getNotes().then(() => {
            // Boş dizi koruması
            if (this.props.notes.length > 0) {
                this.setState(() => {
                    return {
                        notes: this.props.notes,
                    }
                })
            }
            this.setState((state) => {
                return { area: state.notes[0].content }
            })
        })
    }
    // Kayedtme ve sunucuya gönderme işlemi
    save = (e) => {
        e.preventDefault()

        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            // data[state.selectedIndex].content = e.target.value
            return { notes: data }
        })
        // ------------------------------------------- axios.post('http://localhost:4000', this.state.notes[this.state.selectedIndex])
        var tempGuard = this.state.notes.filter(note => note.id != "temp_id_xxx")
        this.props.actions.createNote(tempGuard)

        // --------------------------------------------console.log(typeof (tempGuard))
        // --------------------------------------------console.log(this.state)
        // --------------------------------------------this.setState((state) => {
        // --------------------------------------------    return { notes: [{ a: state.notes }] }
        // --------------------------------------------})
    }
    // Seçili notun değiştirilme işlemi yapılan ayarlamalar
    changeSelected = (e, id) => {
        // sayfanın refresh olması önleme
        e.preventDefault()
        // index alma ve atama
        var note = this.state.notes.find(n => n.id == id)
        var index = this.state.notes.indexOf(note)


        this.setState((state) => {
            var data = state.notes
            data[state.selectedIndex].content = state.area
            // data[state.selectedIndex].content = e.target.value
            return { notes: data }
        })
        // state yönetimi
        this.setState((state) => { return { area: state.notes[index].content, selectedIndex: index } })
    }




    // // Text Area değişikliğinin yakalanması ve ayarlamalar
    // // Biraz kötü oldu kusura bakmayın 
    // handleOnChange = (e) => {
    //     e.preventDefault()
    //     this.setState((state) => {
    //         var data = state.notes
    //         data[state.selectedIndex].content = state.area
    //         // data[state.selectedIndex].content = e.target.value
    //         return { area: e.target.value, notes: data }
    //     })
    //     // console.log(this.state.notes[this.state.selectedIndex].content)
    // }


    // Text Area değişikliğinin yakalanması ve ayarlamalar
    handleOnChange = (e) => {
        e.preventDefault()
        this.setState({ area: e.target.value })
        // console.log(this.state.notes[this.state.selectedIndex].content)
    }


    // Yeni notun oluşturulması ve ayarlamalar
    create = (e) => {
        e.preventDefault()
        // not adının girilip girilmediğinin kontrolü
        if (this.state.newNote != "") {
            // tempGuard ilk oluşturmada oluşan notun içeriğinin 'content' kısmının boş gelmesi hatası düzeltimi 
            // sunucuya yazdığımız temp kodunun gitmemesi için kontrol
            this.setState((state) => {
                var tempGuard = this.state.notes.filter(note => note.id != "temp_id_xxx")
                // console.log("teampGuard ", tempGuard)
                state.notes = tempGuard
                state.selectedIndex = state.notes.length
                state.area = ""
                // yeni not için ayarlamalar ve hazırlıklar
                return state.notes = [...state.notes, { id: uuid.v4(), doc: state.newNote + ".md", content: "" }]

            }
            )


            //------------------------------------   tempGuard ?? this.setState({notes : this.state.notes.filter(note => note.id != "temp_id_xxx")})
            //------------------------------------   this.setState({notes : this.state.notes.filter(note => note.id == "temp_id_xxx")})
            // Not oluşturulduktan sonra ad bloğunun temizlenmesi
            this.setState({ newNote: "" })
        }
        else {
            // Not adı kontrolü
            alert("Not Adı Girilmedi !!!")
        }
        // -------------------------------------------- console.log( "filtrelenmiş veriler", this.state.notes.filter(note => note.id = "temp_id_xxx"))
    }
    // Render işlemi
    render = () => {
        return (
            <>
                <nav class="navbar navbar-light bg-indigo">
                    <div class="container-fluid">
                        <a class="navbar-brand text-white" href="#">TBook</a>


                    </div>
                </nav>
                <div className="container-fluid content-center">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-4 col-lg-4 col-xxl-4 mt-4">
                            <h5 className="card-title text-white">Yeni Not</h5>
                            <div className="container-fluid mt-4 custom-block">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-8 col-md-8 mx-zero">
                                        {/* Yeni not adı input */}
                                        <input type="text" placeholder="Not adı giriniz" className="form-control color-grey" value={this.state.newNote} onChange={(e) => this.setState({ newNote: e.target.value })} />
                                    </div>
                                    <div className="col-sm-12 col-xl-4 col-md-4 mx-zero">
                                        {/* Yeni not oluşturma butonu  */}
                                        <button className="form-control btn color-b text-white" onClick={e => this.create(e)}>Yeni Not</button>
                                    </div>
                                </div>
                            </div>

                            <h5 className="card-title text-white mt-4">Notlar</h5>

                            {/* Her not için buton oluşturma */}
                            <div className="mt-4">
                                {this.state.notes.map((note, index) => <Item changeSelected={this.changeSelected} key={index} id={note.id} note={note} />)}
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-xl-8 col-lg-8 col-xxl-8 mt-4">

                            {/* Text Area */}
                            <h5 className="card-title text-white">Not İçeriği</h5>
                            <textarea className="form-control mt-4 color-grey" placeholder="Notunuzu giriniz" onChange={(e) => this.handleOnChange(e)} name="" id="" value={this.state.area} rows="13"></textarea>

                            {/* Kaydetme butonu */}
                            {/* <h5 className="card-title">Kaydet</h5> */}


                            <button className="btn text-white btn-purple custom-btn text-center mt-2 mb-5" onClick={(e) => this.save(e)}>Kaydet</button>
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

