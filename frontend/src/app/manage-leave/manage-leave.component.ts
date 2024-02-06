import { Component , OnInit , Directive, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import { EmployeesService } from '../api/employees.service';
import { SharedDataService } from '../shared/shared-data.service';



export type SortColumn = keyof any | ''; // Use 'any' as the type for columns
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})

export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrl: './manage-leave.component.css'
})
export class ManageLeaveComponent implements OnInit {
  empData:any;
  username:any;
  desiredEmpId:any;
  leaveHistory:any=[];

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }
    if (direction === '' || column === '') {
      // Assuming your leave history data is already fetched and available
    } else {
      this.leaveHistory = [...this.leaveHistory].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  constructor(private empServ:EmployeesService ,private sharedDataService: SharedDataService){}

  ngOnInit(): void {

    this.sharedDataService.currentUserName.subscribe(userName => {
      this.username = userName;
      console.log(this.username);
    });


    this.empServ.getEmployees().subscribe((data:any)=>{
      this.empData=data;
      console.log(this.empData);
      const desiredEmp=this.empData.find((employee:any)=> employee.userName === this.username);
      this.desiredEmpId=desiredEmp.id;

      console.log(this.desiredEmpId);
      this.leaveHistory=this.empServ.getLeaveHistory(this.desiredEmpId);
      console.log(this.leaveHistory);
      
    })
  }

 
}
