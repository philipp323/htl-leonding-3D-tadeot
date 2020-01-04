package at.htl.Tadeot.rest;

import at.htl.Tadeot.business.ExhibitDAO;
import at.htl.Tadeot.model.Exhibit;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/exhibit")
@Stateless
public class ExhibitEndpoint {
    @Inject
    ExhibitDAO exhibitDAO;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getExhibits() {
        List<Exhibit> exhibits = exhibitDAO.getExhibits();
        return Response.ok()
                .entity(exhibits)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS")
                .build();
    }
}
