import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../app-injection-tokens';
import {Organization, OrganizationUserLink} from './interfaces/organization.interface'

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public currentOrganization: BehaviorSubject<Organization> = new BehaviorSubject({name:"",description:'',avatar:'',_id:''})

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl:string,
  ) { }

  getOrganizationsOfUser(userId:string): Observable<Array<OrganizationUserLink>>{
    return this.http.get<Array<OrganizationUserLink>>(`${this.apiUrl}/v1/api/organization/all/${userId}`);
  }

  createOrganization(organization: any): Observable<Organization>{
    return this.http.post<Organization>(`${this.apiUrl}/v1/api/organization/`, organization);
  }
}
