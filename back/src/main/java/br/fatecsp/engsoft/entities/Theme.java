package br.fatecsp.engsoft.entities;

import br.fatecsp.engsoft.domain.ThemeRequest;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name="theme")
@Data
public class Theme {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String name;
	private BigDecimal price;
	private String imageSrc;
	
	@OneToMany(mappedBy="theme",cascade=CascadeType.ALL)
	private List<Card> cards;

	public static Theme toEntity(ThemeRequest request){
		Theme theme = new Theme();
		theme.setName(request.getName());
		theme.setPrice(request.getPrice());
		theme.setImageSrc(request.getImageSrc());
		return theme;
	}
	
}
