import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { TraductorService } from '../../services/traductor.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private lenguajes: Array<any>;
  private modelTraductor: any;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private traductorSrv: TraductorService
  ) {
    this.lenguajes = new Array<any>();
    this.modelTraductor = {};
  }

  public ngOnInit(): void {
    this.lenguajes.push({ id: "es", texto: "Español" });
    this.lenguajes.push({ id: "en", texto: "Inglés" });
  }

  public traducir(): void {
    //validar datos seleccionados
    if (!(this.modelTraductor.texto && this.modelTraductor.lenguajeDe && this.modelTraductor.lenguajeA)) {
      this.toastCtrl //notificar que faltan datos
        .create({ message: "Faltan datos por ingresar", duration: 4000 })
        .present();
        return;
    }

    if (this.modelTraductor.lenguajeDe == this.modelTraductor.lenguajeA) {
      this.toastCtrl //notificar que faltan datos
        .create({ message: "Los lenguajes no pueden ser iguales", duration: 4000 })
        .present();
        return;
    }

    let loading = this.loadingCtrl.create({ content: "Traduciendo..." });
    loading.present();//mostrar cargando!
    this.traductorSrv.traducir(  //ejecutar funcion de traduccion que provee el servicio
      this.modelTraductor.texto,
      this.modelTraductor.lenguajeDe,
      this.modelTraductor.lenguajeA
    ).then(respuesta => { //manejar respuesta exitosa
      /*
      {
        "data": {
          "translations": [
            {
              "translatedText": "Hola"
            }
          ]
        }
      }
      */
      this.modelTraductor.traduccion = respuesta.data.translations[0].translatedText;
      loading.dismissAll(); //cerrar el loading
    }).catch(err => { //manejar respuesta de error
      loading.dismissAll(); // cerrar el loading
      this.toastCtrl //notificar error
        .create({ message: "Ocurrió un error al intentar traducir", duration: 4000 })
        .present();
    });
  }

}
