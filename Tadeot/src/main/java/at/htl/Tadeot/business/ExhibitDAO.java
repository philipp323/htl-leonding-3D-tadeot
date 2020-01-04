package at.htl.Tadeot.business;

import at.htl.Tadeot.model.Exhibit;

import javax.ejb.Stateless;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Stateless
public class ExhibitDAO {
    @PersistenceContext
    EntityManager em;

    public List<Exhibit> getExhibits(){
        TypedQuery<Exhibit> query = em.createNamedQuery("Exhibit.getAll", Exhibit.class);
        System.out.println(query.getResultList().get(0).getName());
        return query.getResultList();
    }
}
