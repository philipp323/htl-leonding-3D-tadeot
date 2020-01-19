package at.htl.Tadeot.model;


import javax.persistence.*;
import java.math.RoundingMode;

@Entity
@NamedQueries({
        @NamedQuery(name = "Exhibit.getAll", query = "select e from Exhibit e")
})
public class Exhibit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String supervisor;
    private String department;
    private int x;
    private int y;
    private int z;
    private String tooltipText;

    @OneToOne
    private Room room;

    public Exhibit(String name, String supervisor, String department, Room room, int x, int y, int z, String tooltipText) {
        this.name = name;
        this.supervisor = supervisor;
        this.department = department;
        this.room = room;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tooltipText = tooltipText;
    }

    public Exhibit() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getZ() {
        return z;
    }

    public void setZ(int z) {
        this.z = z;
    }

    public String getTooltipText() {
        return tooltipText;
    }

    public void setTooltipText(String tooltipText) {
        this.tooltipText = tooltipText;
    }
}
