import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Documents} from "../../models/Documents";
import {DocumentCriteria} from "../../models/DocumentCriteria";
import {Page} from "../../models/Page";
import {DataResponse} from "../../models/DataResponse";



@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) { }


  //enregistrement d'un document
  createDocument(file: File ):Observable<Documents>{
    //content type devrait être multipart formdata pour le laisser se definir lui-même au niveau du backend
    let formData= new FormData();
    formData.append("file",file);
    console.log("form",formData.get("file"))
    return this.http.post<Documents>(environment.backendAPI,formData);

  }

  //modification d'un document
 updateDocument(id: number, file: File | any ):Observable<Documents>{
    //content type devrait être multipart formdata pour le laisser se definir lui-même au niveau du backend
    let formData= new FormData();
    formData.append("file",file);
    console.log("form",formData.get("file"))
    return this.http.put<Documents>(environment.backendAPI + id, formData);
  }

  // telecharger un document
  public downloadDocument(id: number)  {
    return this.http.get(environment.backendAPI  + "download/"+id, {responseType: 'blob'});
  }

  // afficher un document
  public getDocument(id:number):Observable<Documents>{
    return this.http.get<Documents>(environment.backendAPI+id);
  }

  public documentSpecification(criteria: DocumentCriteria):Observable<Page<Documents>>{

    return this.http.post<Page<Documents>>(environment.backendAPI  + "criteria",criteria);
  }

  // supprimer un Document
  public deleteDocument(id: number) :Observable<DataResponse> {
    return this.http.delete<DataResponse>(environment.backendAPI + id);
  }

}
