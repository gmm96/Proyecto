import {Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import * as moment from "moment";

@Component({
    selector: 'app-team-table',
    templateUrl: './teamTable.component.html',
    styleUrls: ['./teamTable.component.scss']
})
export class TeamTableComponent implements OnInit, OnDestroy {

    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input('teams') teams: any;
    teamsCompatible: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.setDataTable();
        this.displayedColumns = ['name', 'city', 'playersLength'];
    }

    ngOnDestroy() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setDataTable();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    setDataTable() {
        if (this.teams) {
            this.teamsCompatible = this.teams.map(item => {
                return {
                    _id: item._id,
                    name: item.name,
                    city: item.city,
                    playersLength: (item.players && item.players.length)? item.players.length : 0,
                    avatar: item.avatar? "http://localhost:3000" + item.avatar : null
                }
            });
            this.dataSource = new MatTableDataSource(this.teamsCompatible);
            this.dataSource.paginator = this.paginator;
        }
    }

    goToPlayer(player) {
        this.router.navigate([/teams/ + player._id]);
    }
};
