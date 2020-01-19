package at.htl.Tadeot.business;

import at.htl.Tadeot.model.Exhibit;
import at.htl.Tadeot.model.Room;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@ApplicationScoped
public class InitBean {

    @PersistenceContext
    EntityManager em;

    public InitBean() {

    }

    @Transactional
    private void init(@Observes @Initialized(ApplicationScoped.class) Object init) throws IOException {
        System.err.println("Init started!");
        String row;
        InputStream csvStream = getClass().getClassLoader().getResourceAsStream("META-INF/exhibits.csv");
        BufferedReader csvReader = new BufferedReader(new InputStreamReader(csvStream));
        while ((row = csvReader.readLine()) != null) {
            String[] data = row.split(";");
            Room room = new Room(data[0], data[7]);
            em.persist(room);
            //String name, String supervisor, String department, Exhibit exhibit
            Exhibit exhibit = new Exhibit(
                    data[1],
                    data[2],
                    data[3],
                    room,Integer.parseInt(data[4]),
                    Integer.parseInt(data[5]),
                    Integer.parseInt(data[6]),
                    data[8]);
            em.persist(exhibit);
        }
        csvReader.close();
    }
}
